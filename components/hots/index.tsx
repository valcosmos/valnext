import React, {useState} from 'react'

import {useRouter} from 'next/router'

import {Card, List, Badge} from 'antd'

import {FireOutlined} from '@ant-design/icons'

import {PostInfo} from '@/common/interface'

import style from './hots.module.scss'


export default function Hots({list}: { list?: any }) {
  const router = useRouter()

  const [loading] = useState<boolean>(false)

  const [hots] = useState<Array<PostInfo>>(list)

  // const getList = async () => {
  //   setLoading(true)
  //   const {code, msg, data} = (await getHotPosts()) as HttpResponse
  //   if (code !== 200) return message.error(msg || 'unknown error')
  //   setHots(data)
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   getList()
  // }, [])

  const toPostDetail = (id: string) => {
    router.push(`/post/${id}`)
  }

  return (
    <div className={style.hots}>
      <Card
        title={
          <>
            <FireOutlined/>
            <span className="ms-1">点击排行</span>
          </>
        }
      >
        <List
          dataSource={hots}
          loading={loading}
          className={'hot-list'}
          renderItem={(item, index) => (
            <List.Item>
              <div onClick={() => toPostDetail(item._id)} className="title">
                <Badge
                  count={index + 1}
                  style={{backgroundColor: index < 3 ? '#52c41a' : '#d3d3d3'}}
                />
                <span className="ms-1 title-content">{item.title}</span>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}
