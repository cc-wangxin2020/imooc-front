import { WEI_BO_APP_KEY, WEI_BO_UID } from '@/constants'
export const weiboShare = (imgUrl, path) => {
  window.open(
    `https://service.weibo.com/share/share.php?appkey=${WEI_BO_APP_KEY}&ralateUid=${WEI_BO_UID}&pic=${imgUrl}&title=这张图不错哦，给大家分享一下 ${path}`,
    '_blank'
  )
}