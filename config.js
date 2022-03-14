/**
 * * Created by malaohu on 2020/05/10.
*/

//黑名单前缀
const pre_blacklist = ["admin","master", "info", "mail", "webadmin", "webmaster", "noreply", "system", "postmaster"]

//拒收以下邮箱域名的邮件
//const ban_send_from_domain = ["163.com", "gmail.com"]
const ban_send_from_domain = ["xxx.com"]

module.exports = {pre_blacklist:pre_blacklist, ban_send_from_domain:ban_send_from_domain}
