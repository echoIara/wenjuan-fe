import React, { FC, useEffect } from "react";
import { nanoid } from "nanoid";
import { Checkbox, Form, Input, Select, Button, Space } from "antd";
import { OptionType, QuestionRadioPropsType } from "./interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const PropComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      value,
      options,
    });
  }, [title, isVertical, value, options, form]);

  function handleValueChange() {
    if (onChange == null) return;
    const newValues = form.getFieldsValue() as QuestionRadioPropsType;

    // 清除 text undefined 选项
    if (newValues.options) {
      newValues.options = newValues.options.filter(
        (opt) => !(opt.text == null)
      );
    }

    const { options = [] } = newValues;
    options.forEach((opt: OptionType) => {
      if (opt.value) return;
      opt.value = nanoid(5); // 补齐 opt value
    });
    onChange(newValues);
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      disabled={disabled}
      onValuesChange={handleValueChange}
      form={form}
    >
      <Form.Item
        label="题目"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项 */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项输入框 */}
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((opt: OptionType) => {
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
                    {index > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: "", value: "" })}
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

      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({
            value,
            label: text || "",
          }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
