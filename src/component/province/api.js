import jsonp from 'jsonp';


export function getProvince(fn) {
  return jsonp(
    'http://restapi.amap.com/v3/config/district?key=609797c5e9c8db00e92dbf5569f46ac2&subdistrict=3',
    {},
    fn
  )
}
