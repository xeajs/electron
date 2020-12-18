import axios, { AxiosRequestConfig, InjectAbort } from '@/Render/axios';

import { SendType } from '@/Typing';

/** 删除布控任务 请求参数 */
export interface GetDemoList$$Request {}
/** 删除布控任务 响应参数*/
export interface GetDemoList$$Response {}

export function GetDemoList(request: GetDemoList$$Request, config?: AxiosRequestConfig) {
  return axios.post<SendType<GetDemoList$$Response>>('/apis/getDemoList', request, InjectAbort(GetDemoList, config));
}
