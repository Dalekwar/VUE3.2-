import request from './request'

export const menuList = () => {
  return request.get('/menus')
}
