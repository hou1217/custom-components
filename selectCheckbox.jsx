/*
 * @Author: hys
 * @Date: 2022-03-16 16:42:35
 * @LastEditors: hys
 * @LastEditTime: 2022-03-16 18:12:56
 * @Description: 结合Select和Checkbox实现的自定义下拉多选框组件，可以根据传入的属性值得到不同的下拉多选框
 * @Props:
 *  values： 选中的值
 *  setValues： 改变values的方法
 *  defaultValue： 多选框的选项
 *  type： 目前1代表节点类型，2代表边类型
 */
import React, { useState, useEffect } from 'react';
import { Select, Checkbox } from 'antd';
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const SelectCheckbox  = (props) => {
  const { values, setValues, defaultValue, type } = props;
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(true);
  // 处理全选
  const onCheckAllChange = (e) => {
    setCheckAll(e.target.checked);
    setValues(e.target.checked ? defaultValue : []);
    setIndeterminate(false);
  };
  // 处理勾选
  const onChange = (list) => {
    setCheckAll(list.length === 2);
    setValues(list);
    setIndeterminate(!!list.length && list.length < 2);
  };
  return (
    <Select
      style={{ width: '120px' }}
      placeholder={type === '1' ? '请选择节点类型' : '请选择边类型'}
      value={type === '1' ? '节点类型' : '边类型'}
    >
      <Option value="">
        <div className="type-item">
          <Checkbox
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={(e) => onCheckAllChange(e)}
          >
            全选
          </Checkbox>
        </div>
        <CheckboxGroup value={values} onChange={onChange}>
          {defaultValue.map((item) => (
            <div className="type-item">
              <Checkbox value={item}>
                <span>{item}</span>
              </Checkbox>
            </div>
          ))}
        </CheckboxGroup>
      </Option>
    </Select>
  );
};
export default SelectCheckbox;
