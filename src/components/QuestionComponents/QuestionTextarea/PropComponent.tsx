import React, { FC, useEffect } from "react";
import { Form, Input } from "antd";
import { QuestionTextareaPropsType } from "./interface";

const PropComponent: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType
) => {
  const { title, placeHolder, onChange, disabled } = props;
  const [form] = Form.useForm();

  // 监听 title/placeHolder 的变化
  useEffect(() => {
    form.setFieldsValue({
      title,
      placeHolder,
    });
  }, [title, placeHolder, form]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{ title, placeHolder }}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="PlaceHolder" name="placeHolder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
