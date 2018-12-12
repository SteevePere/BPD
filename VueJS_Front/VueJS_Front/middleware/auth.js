export default function ({ store, error }) {
  if (!store.state.authUser) {
    error({
      message: 'You are not connected Please go to Register',
      statusCode: 403
    })
    //return redirect('/')
  }
}
