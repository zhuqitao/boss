export function getRedirectPath({type, avatar}) {
    // 根据用户信息  返回跳转地址
    // user.type / boss /geniusinfo  根据用户类型 跳转到牛人或boss
    // user .avatar /bossinfo /geniusinfo  根据有没有头像 跳转到牛人信息或者boss信息
    let url = (type === 'boss')
        ? '/boss'
        : '/genius'
    if(!avatar) {
        url += 'info';
    }
    return url;
}