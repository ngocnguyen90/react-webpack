
export function isLoggedIn(accountInfor) {
  return Object.values(accountInfor).every((value)=>(value===null ? false : true))
}
