import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
  console.log(data)
  return request({
    url: '/UserLogin',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
