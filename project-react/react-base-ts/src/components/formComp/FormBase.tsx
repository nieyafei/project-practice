import React, {FC} from "react";
import { Form, Input, InputNumber, DatePicker, Select, Cascader, Radio } from "antd";
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
interface Props {
  layout?: Object,
  name?: string,
  required?: boolean,
  parent?: any,
  label?: string,
  rules?: Array<Object>,
  afterCom?:any,
  isFormItem?: boolean,
  childrenOption?: any,
  type?: any,
  typeitem?: string
}
interface State {}
/* typeitem = 'input';
  type = 'string'; */
const InputItem: React.FC<Props> =(props)=>{
  const { layout, parent, label, rules = [], required, name, afterCom, isFormItem = true, typeitem="input", type="string", ...otherProps } = props;
  let placeholder:any = `请输入${label}`;
  let eventChange = {};
  const Child =()=> {
    if(typeitem === "input"){
      return (<Input placeholder={placeholder} {...otherProps} />)
    }else if(typeitem === "input-password"){
      return (<Input.Password placeholder={placeholder} {...otherProps} />)
    }else if(typeitem === "input-number"){
      return (<InputNumber placeholder={placeholder} {...otherProps} />)
    }else if(typeitem === "date-picker"){
      return (<DatePicker placeholder={placeholder} {...otherProps} />)
    }else if(typeitem === "textarea"){
      return (<TextArea placeholder={placeholder} {...otherProps} />)
    }else if(typeitem === "select"){
      return (
        <Select
          {...otherProps}
          placeholder={placeholder}
          {...eventChange}
        >
          {props.childrenOption}
        </Select>
      )
    }else if(typeitem === "input-search"){
      return <Input.Search placeholder={placeholder} {...otherProps} />
    }else if(typeitem === "date-ranger-picker"){
      return <DatePicker.RangePicker placeholder={placeholder} {...otherProps} />
    }else if(typeitem === "date-month-picker"){
      return <DatePicker.MonthPicker placeholder={placeholder} {...otherProps} />
    }else if(typeitem === "cascader"){
      return null// <Cascader placeholder={placeholder} {...otherProps} />
    }else if(typeitem === "radio-group"){
      return <RadioGroup {...otherProps} > {props.children}</RadioGroup>
    }
  };
  const item =()=> <FormItem label={label} name={name} rules= {[{ required, message: placeholder, whitespace: true, type }, ...rules]} {...layout} >
    {Child()}
  </FormItem>
  return (
    <React.Fragment>
      {
        afterCom?
        <FormItem label={label} {...layout}>
          <FormItem
            noStyle
            name={name}
            rules= {[{ required, message: placeholder, type }, ...rules]}
          >
            {Child()}
          </FormItem>
          {afterCom}
        </FormItem>:
        item()
      }
    </React.Fragment>
  )
}

const InputPasswordItem: FC<Props> =(props)=> {
  return <InputItem typeitem="input-password" type = "string" {...props} />
};

/* export class InputPasswordItem extends InputItem{
  typeitem='input-password';
  type = 'string';
} */

/* export class NumberItem extends InputItem{
  typeitem='input-number';
  type = 'number';
}

export class DatePickerItem extends InputItem{
  typeitem = "date-picker";
  type = 'object';
}

export class DateMonthPickerItem extends InputItem{
  typeitem = "date-month-picker";
  type = 'object';
}

export class DateRangerPickerItem extends InputItem{
  typeitem = "date-ranger-picker";
  type = 'array';
}

export class SelectItem extends InputItem{
  typeitem = "select";
  type = 'string';
}

export class SearchItem extends InputItem{
  typeitem = "input-search";
}

export class TextAreaItem extends InputItem{
  typeitem='textarea';
  type = 'string';
}

export class CascaderItem extends InputItem{
  typeitem='cascader';
  type = 'array';
}

export class RadioGroupItem extends InputItem{
  typeitem='radio-group';
  type = 'number';
} */

const Main = {
  Input: InputItem,
  InputPassword: InputPasswordItem,
  /* textArea: TextAreaItem,
  number: NumberItem,
  datePicker: DatePickerItem,
  monthPicker: DateMonthPickerItem,
  rangerPicker: DateRangerPickerItem,
  select: SelectItem,
  search: SearchItem,
  cascader: CascaderItem,
  radioGroup: RadioGroupItem, */
}
export default Main;