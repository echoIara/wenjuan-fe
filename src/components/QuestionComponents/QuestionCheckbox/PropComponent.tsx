import React, { FC } from "react";
import { Form, Input, Checkbox, Button, Space } from "antd";
import { nanoid } from "nanoid";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { OptionType, QuestionCheckboxPropsType } from "./interface";

const PropComponent: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const { title, isVertical, list = [], onChange, disabled } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    if (onChange == null) return;
    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType;

    // 清除 text undefined 选项
    if (newValues.list) {
      newValues.list = newValues.list.filter((opt) => !(opt.text == null));
    }

    const { list = [] } = newValues;
    list.forEach((opt: OptionType) => {
      if (opt.value) return;
      opt.value = nanoid(5); // 补齐 opt value
    });

    onChange(newValues);
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项 */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项是否选中 */}
                    <Form.Item name={[name, "checked"]} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    {/* 当前选项输入框 */}
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue();
                            let num = 0;
                            list.forEach((opt: OptionType) => {
                              if (opt.text === text) num++; // 记录 text 相同的个数，预计只有一个
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(
                              new Error("选项文字不能重复")
                            );
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字..." />
                    </Form.Item>
                    {/* 当前选项删除按钮 */}
                    {index > 0 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: "", value: "", checked: false })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
