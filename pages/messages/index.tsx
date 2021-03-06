import { GetStaticProps} from 'next'

import dynamic from 'next/dynamic'

import Head from 'next/head'

import React, {useState} from 'react'

import {message} from 'antd'

const CommentList = dynamic(() => import('@/components/comment-list'))

import {HttpResponse, MsgInfo} from '@/common/interface'

import {getMsgs, setMsgs} from '@/api/common'


import {toTree} from '@valcosmos/to-tree'

import {FormType} from '@/components/comment-form'

import style from './msg.module.scss'

import {formatDate} from '@/utils/utils'

export default function Messages({data}: any) {
  const [messageList, setMessageList] = useState<MsgInfo[]>(toTree(data.data, '_id', 'pid'))

  const [total, setTotal] = useState<number>(data.total)

  const getMsgList = async () => {
    const {code, data, total, msg} = (await getMsgs()) as HttpResponse
    if (code !== 200) return message.error(msg || 'unknown error')
    setMessageList(toTree(data, '_id', 'pid'))
    setTotal(total as number)
  }

  const onSubmit = async (value: FormType) => {
    const {code, msg} = (await setMsgs(value)) as HttpResponse
    if (code !== 200) return message.error(msg || 'unknown error')
    await getMsgList()
  }

  const setFormData = async (props: FormType) => {
    if (props.email === '') {
      delete props.email
    }
    onSubmit(props)
  }

  // useEffect(() => {
  //   getMsgList()
  // }, [])

  return (
    <>
      <Head>
        <title>Valcosmos | 留言</title>
        <meta
          name="description"
          content="valcosmos-李青丘的个人博客-Web前端开发-分享前端技术-站点留言"
        />
      </Head>
      <div className={style.message + ' container'}>
        <CommentList setFormData={setFormData} list={messageList} total={total}/>
      </div>
    </>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  const {data: res, total} = (await getMsgs()) as HttpResponse

  const data = res.map((item: MsgInfo) => ({...item, created: formatDate(item.created as string)}))

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {data: {total, data}}, // will be passed to the page component as props
    revalidate: 60
  }
}
