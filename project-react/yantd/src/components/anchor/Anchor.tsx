import React, {FC, useState, useRef, useContext, useEffect} from "react";
import classNames from 'classnames';
import "../../../types";
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import { YantAnchor, AnchorState, AnchorContainer } from "./type";
import AnchorContext from "./context";
import scrollTo from '../_util/scrollTo';
import getScroll from '../_util/getScroll';

const links: string[] = [];
const sharpMatcherRegx = /#(\S+)$/;
type Section = {
  link: string;
  top: number;
};

export interface AnchorProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  offsetTop?: number;
  bounds?: number;
  affix?: boolean;
  showInkInFixed?: boolean;
  getContainer?: () => AnchorContainer;
  /** Return customize highlight anchor */
  getCurrentAnchor?: () => string;
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string },
  ) => void;
  /** Scroll to target offset value, if none, it's offsetTop prop value or 0. */
  targetOffset?: number;
  /** Listening event when scrolling change active link */
  onChange?: (currentActiveLink: string) => void;
}

const Main:FC<AnchorProps> =(props)=> {
  const { prefixCls: customizePrefixCls, className = '', style, offsetTop, affix, showInkInFixed, children, onChange } = props;
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [animating, setAnimating] = useState<boolean>(false);
  const getContainer = () => {
    const { getContainer } = props;
    const getFunc = getContainer || getTargetContainer || getDefaultContainer;
    return getFunc();
  };
  const handleScroll = () => {
    if (animating) {
      return;
    }
    const { offsetTop, bounds, targetOffset } = props;
    const currentActiveLink = getCurrentAnchor(
      targetOffset !== undefined ? targetOffset : offsetTop || 0,
      bounds,
    );
    setCurrentActiveLink(currentActiveLink);
  };
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | Window>(getContainer());
  const [scrollEvent, setScrollEvent] = useState<any>(addEventListener(scrollContainer, 'scroll', handleScroll));
  const wrapperRef = useRef<HTMLDivElement>(); 
  const { getPrefixCls, direction, getTargetContainer } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('yanchor', customizePrefixCls);
  const [inkNode, setInkNode] = useState<HTMLSpanElement>()
  const registerLink = (link: string) => {
    if (!links.includes(link)) {
      links.push(link);
    }
  };
  const unregisterLink = (link: string) => {
    const index = links.indexOf(link);
    if (index !== -1) {
      links.splice(index, 1);
    }
  };
  const saveInkNode = (node: HTMLSpanElement) => {
    setInkNode(node);
  };

  const setCurrentActiveLink = (link: string) => {
    if (activeLink !== link) {
      setActiveLink(link);
      onChange?.(link);
    }
  };

  const handleScrollTo = (link: string) => {
    const { offsetTop, targetOffset } = props;
    setCurrentActiveLink(link);
    const container = getContainer();
    const scrollTop = getScroll(container, true);
    const sharpLinkMatch = sharpMatcherRegx.exec(link);
    if (!sharpLinkMatch) {
      return;
    }
    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
      return;
    }

    const eleOffsetTop = getOffsetTop(targetElement, container);
    let y = scrollTop + eleOffsetTop;
    y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
    setAnimating(true);

    scrollTo(y, {
      callback: () => {
        setAnimating(false);
      },
      getContainer
    });
  };

  const getCurrentAnchor =(offsetTop = 0, bounds = 5): string=> {
    const { getCurrentAnchor } = props;

    if (typeof getCurrentAnchor === 'function') {
      return getCurrentAnchor();
    }

    const linkSections: Array<Section> = [];
    const container = getContainer();
    links.forEach(link => {
      const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = getOffsetTop(target, container);
        if (top < offsetTop + bounds) {
          linkSections.push({
            link,
            top,
          });
        }
      }
    });

    if (linkSections.length) {
      const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
      return maxSection.link;
    }
    return '';
  }
  const inkClass = classNames(`${prefixCls}-ink-ball`, {
    visible: activeLink,
  });

  const wrapperClass = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );
  const wrapperStyle = {
    maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
    ...style,
  };
  const anchorClass = classNames(prefixCls, {
    fixed: !affix && !showInkInFixed,
  });
  const anchorContent = (
    <div className={wrapperClass} style={wrapperStyle}>
      <div className={anchorClass}>
        <div className={`${prefixCls}-ink`}>
          <span className={inkClass} ref={saveInkNode} />
        </div>
        {children}
      </div>
    </div>
  ) as any;
  const updateInk = () => {
    const anchorNode = wrapperRef.current;
    const linkNode = anchorNode?.getElementsByClassName(`${prefixCls}-link-title-active`)[0];

    if (linkNode && inkNode) {
      inkNode.style.top = `${(linkNode as any).offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    }
  };

  wrapperRef.current = anchorContent;
  
  useEffect(()=> {
    handleScroll();
    return ()=> {
      console.log('组件关闭, 事件移除');
      scrollEvent && scrollEvent.remove();
    }
  }, [scrollEvent])
  useEffect(()=> {
    if (scrollEvent) {
      const currentContainer = getContainer();
      if (scrollContainer !== currentContainer) {
        setScrollContainer(currentContainer);
        scrollEvent.remove();
        setScrollEvent(addEventListener(currentContainer, 'scroll', handleScroll))
        handleScroll();
      }
    }
    updateInk();
  }, [scrollContainer])
  return (
    <AnchorContext.Provider 
      value={{
        registerLink,
        unregisterLink,
        activeLink,
        scrollTo: handleScrollTo,
        onClick: props.onClick
      }}
    >
      {anchorContent}
    </AnchorContext.Provider>
  )
}

export default Main;

function getDefaultContainer() {
  return window;
}

function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument!.documentElement!;
      return rect.top - container.clientTop;
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top;
  }

  return rect.top;
}