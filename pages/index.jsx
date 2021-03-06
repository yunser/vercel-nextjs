import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from './home.module.scss'
import { Base64 } from 'js-base64'
import * as dayjs from 'dayjs'

const max_day = 28

export default function Home() {

    const [list, setList] = useState([])

    async function loadReadme() {
        const res = await fetch('https://api.github.com/repos/yunser/coding-every-day/contents/README.md').then(res => res.json())
        console.log('res', res)
        const { content } = res
        console.log('content', content)
        const rawText = Base64.decode(content)
        console.log('rawText', rawText)

//         const rawText = `* 2022-05-20
//     * [3D 苹果应用商店图标](https://3d-app.yunser.com/blank)
// * 2022-05-19
//     * [Chrome Extension Boilerplate](https://github.com/yunser/chrome-template)
//     * [Vercel 测试项目](https://github.com/yunser/vercel-nextjs)
//     * [踩了一个 THREE.js SpotLight 方向的坑](https://3d-app.yunser.com/spotLight)
// * 2022-05-18
//     * [阿里云函数计算测试](https://github.com/yunser/serverless-aliyun)
//     * [利用 CSS 变量修改主题](https://css-pro.yunser.com/theme)
// * 2022-05-17：[可调整大小的左右布局](https://css-pro.yunser.com/layout)
// * 2022-05-16：[uTools UUID 插件](https://github.com/yunser/uuid-utools)
// * 2022-05-15：[flex-grid](https://demos.yunser.com/css/flex-gap/)
// * 2022-05-11: [白板 MVC](https://bg.yunser.com/board)
// * 2022-05-10: [画一个支持拖拽的矩形](https://bg.yunser.com/board)
// * 2022-05-09：[给 GeoGebra 网页编辑器加上撤回快捷键](https://github.com/yunser/geogebra-userscript)
// * 2022-05-08：[FFCreator 学习 - 制作一个「倒计时」的视频](https://github.com/yunser/ffcreator-test)
// * 2022-05-07：[FFCreator 学习 - 制作一个「猜省会」的视频](https://github.com/yunser/ffcreator-test)
// * 2022-05-06：[FFCreator 学习](https://github.com/yunser/ffcreator-test)`
        const match = rawText.match(/\*\s+\d{4}\-\d{2}\-\d{2}/g)
        console.log('match', match)
        // 
        if (match) {
            const dates = match.map(item => item.replace('* ', ''))
            const list = [
                // {
                //     date: '2022-05-21',
                //     mark: true,
                // },
                // {
                //     date: '2022-05-20',
                //     mark: false,
                // },
                // {
                //     date: '2022-05-19',
                //     mark: true,
                // },
            ]

            for (let idx = 0; idx < max_day; idx++) {
                console.log('idx', idx, dayjs().add(-idx, 'days').format('YYYY-MM-DD'))
                const djs = dayjs().add(-idx, 'days')
                const date = djs.format('YYYY-MM-DD')
                const fItem = dates.find(d => d == date)
                list.push({
                    date,
                    mark: !!fItem,
                    text: djs.format('DD'),
                })

            }
            console.log('list', list)
            setList(list)

        }
    }
    // const dates = ['2022-05-20', '2022-05-19', '2022-05-18', '2022-05-17', '2022-05-16', '2022-05-15', '2022-05-11', '2022-05-10', '2022-05-09', '2022-05-08', '2022-05-07', '2022-05-06']
    // console.log()

    useEffect(() => {
        loadReadme()
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.title}>写代码</div>
                <div className={styles.subTitle}>{max_day} 天打卡</div>
                <div className={styles.records}>
                    {list.map(item => {
                        return (
                            <div
                                className={styles.item}
                                key={item.date}
                                style={{
                                    backgroundColor: item.mark ? '#81B887' : '#D8D8D8',
                                }}
                            >
                                <div>{item.text}</div>
                            </div>
                        )
                    })}
                </div>
                {/* <iframe
                    style={{
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                    // style="border: ;"
                    width={800}
                    height={450}
                    src="https://mastergo.com/file/61618097948782?source=iframe_share"
                    allowfullscreen></iframe> */}
            </main>
        </div>
    )
}
