import request from './index'

export const login = params => request.post('/user/login', params)

export const register = params => request.post('/user/register', params)

export const changeUserInfo = params => request.post('/user/updateUserInfo', params)

export const getUserInfo = user_id => request.get('/user/getUserInfo?user_id=' + user_id)

export const addArticle = params => request.post('/article/add', params)

export const addLabel = params => request.post('/label/add', params)

export const getLabel = user_id => request.get('/label?user_id=' + user_id)

export const delLabel = label_id => request.get('/label/del?label_id=' + label_id)

export const getArticleList = user_id => request.get('/article/getAll?user_id=' + user_id)

export const getArticle = article_id => request.get('/article/getAll?article_id=' + article_id)

export const addCommen = params => request.post('/article/addComment', params)

// 添加编
export const addCompile =  params => request.post('/case/addCompile', params)

// 获取编
export const getCompile = user_id => request.get('/case/getCompile?user_id=' + user_id)

// 添加分编
export const addBranchCompile =   params => request.post('/case/addBranchCompile', params)

// 获取编和分编
export const getClassification =  user_id => request.get('/case/getClassification?user_id=' + user_id)

// 添加章
export const addChapter =  params => request.post('/case/addChapter', params)

// 
export const getAllClassification = user_id => request.get('/case/getAllClassification?user_id=' + user_id)

// 添加case
export const addCase = params => request.post('/case/addCase', params)

// 获取case列表
export const getCaseList = user_id => request.get('/case/getCaseList?user_id=' + user_id)
