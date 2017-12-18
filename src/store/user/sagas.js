import { take, put, call, fork } from 'redux-saga/effects'
import { userLogin, userRegister } from './actions'


export function* loginAsync(options, api) {
  try {
    const response = yield call([api, api.post], 'users/login', {
      user: {
        email: options.email,
        password: options.password,
      },
    })
    const user = { ...response.user }

    yield put(userLogin.success({ user }))
    console.log('api', api)
    yield call(api.setToken, user.token)
  } catch (e) {
    yield put(userLogin.failure(e))
  }
}

export function* registerAsync(options, api) {
  try {
    const response = yield call([api, api.post], 'users', {
      user: {
        username: options.username,
        email: options.email,
        password: options.password,
      },
    })
    const user = { ...response.user }
    yield put(userRegister.success({ user }))
    yield call(api.setToken, user.token)
  } catch (e) {
    yield put(userRegister.failure(e))
  }
}

export function* watchLogin(api) {
  const { options } = yield take('USER_LOGIN_REQUEST')
  console.log('options', options)
  yield call(loginAsync, options, api)
}

export function* watchRegister(api) {
  const { options } = yield take('USER_REGISTER_REQUEST')
  console.log('register options', options)
  yield call(registerAsync, options, api)
}

export default function* ({ api }) {
  yield fork(watchLogin, api)
  yield fork(watchRegister, api)
}
