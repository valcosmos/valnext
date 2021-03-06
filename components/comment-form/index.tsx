import React, {createRef} from 'react'

import {Button, Col, Form, Input, Row} from 'antd'

import {MailOutlined, UserOutlined} from '@ant-design/icons'

import type {FormInstance} from 'antd/es/form';

import style from './input.module.scss'

interface CommentFormProps {
  info?: string
  pid?: string
  getFormData: (props: FormType) => void
}

export interface FormType {
  content: string
  nickname: string
  email?: string
}

export default function CommentForm({info, pid, getFormData}: CommentFormProps) {
  const formRef = createRef<FormInstance>()
  const onFinish = (value: FormType) => {
    const v = {
      ...value,
      email: value.email ? value.email : '',
      pid: pid || '0'
    }
    getFormData(v)
    formRef.current?.resetFields()
  }

  return (
    <div className={style.commentForm}>
      <Form
        ref={formRef}
        onFinish={onFinish}
        autoComplete="off"
        validateTrigger={['onBlur', 'onChange']}
      >
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: '请输入评论内容',
              validateTrigger: 'onBlur'
            },
            {
              max: 1000,
              message: '字数不能超过1000字哟～',
              validateTrigger: 'onChange'
            }
          ]}
        >
          <Input.TextArea
            placeholder={info ? `@${info}` : '内容'}
            autoSize={{minRows: 3, maxRows: 5}}
          />
        </Form.Item>

        <div className="form-footer">
          <Row gutter={20}>
            <Col xs={24} sm={12}>
              <Form.Item
                name={'email'}
                rules={[
                  {
                    validator: (rule, value) => {
                      const emailReg =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      if (!value || emailReg.test(value))
                        return Promise.resolve()
                      return Promise.reject('请输入正确的邮箱')
                    },
                    validateTrigger: 'onChange'
                  }
                ]}
              >
                <Input placeholder="邮箱" prefix={<MailOutlined/>}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name={'nickname'}
                rules={[
                  {
                    required: true,
                    message: '请输入昵称',
                    validateTrigger: 'onBlur'
                  },
                  {
                    max: 20,
                    message: '昵称不能超过20个字哟～',
                    validateTrigger: 'onChange'
                  }
                ]}
              >
                <Input placeholder="昵称" prefix={<UserOutlined/>}/>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="ms-2 btn">
            <Button type="primary" size="large" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </div>
        <div className="info">
          *邮箱为选填，
          若输入邮箱，您留言的回复，将在第一时间以邮件的形式通知您。
        </div>
      </Form>
    </div>
  )
}
