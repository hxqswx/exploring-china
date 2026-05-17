/* ──────────────────────────────────────────────────
   i18n — translation table and helpers
   ────────────────────────────────────────────────── */
import { state } from './state.js';

// translate a {en, zh} dict using current language
export const t = (obj) =>
  (obj && typeof obj === 'object' && 'en' in obj)
    ? (obj[state.lang] || obj.en)
    : obj;

// shared translation table
export const T = {
  brand: {en:'Exploring China', zh:'探索中国'},
  brandSub: {en:'A Comprehensive Guide', zh:'深度旅行指南'},
  nav: {
    destinations:{en:'Destinations', zh:'目的地'},
    guide:{en:'The Guide', zh:'深度导览'},
    fireworks:{en:'Fireworks', zh:'烟花盛景'},
    plan:{en:'Plan a Trip', zh:'行程规划'},
    store:{en:'Store', zh:'商店'},
    community:{en:'Community', zh:'旅行社区'}
  },
  empty:{
    cart:{en:'Your cart is empty.', zh:'购物车空空如也。'},
    cartSub:{en:'Browse the store to add a few souvenirs from your journey.', zh:'前往商店，挑选几件旅途的纪念品。'},
    orders:{en:'No orders yet.', zh:'尚无订单。'},
    threads:{en:'No threads here yet — be the first.', zh:'此处尚无讨论——你将是第一个。'}
  },
  signin:{
    title:{en:'Welcome back', zh:'欢迎回来'},
    sub:{en:'Sign in to view your orders, your saved journeys, and the forum.', zh:'登录以查看订单、已保存的行程与论坛。'},
    email:{en:'Email', zh:'邮箱'},
    password:{en:'Password', zh:'密码'},
    btn:{en:'Sign In', zh:'登录'},
    new:{en:'New here?', zh:'还未注册？'},
    create:{en:'Create an account', zh:'注册账户'},
    wrong:{en:'Incorrect email or password.', zh:'邮箱或密码不正确。'},
    notVerified:{en:'Please verify your email first. We have re-sent the code.', zh:'请先验证邮箱，验证码已重新发送。'}
  },
  signup:{
    title:{en:'Create an account', zh:'注册账户'},
    sub:{en:'It takes about a minute — we will send a 6-digit code to your email.', zh:'仅需一分钟——我们将发送六位验证码至您的邮箱。'},
    name:{en:'Full name', zh:'姓名'},
    email:{en:'Email', zh:'邮箱'},
    password:{en:'Password (8+ chars)', zh:'密码（至少 8 位）'},
    btn:{en:'Send verification code', zh:'发送验证码'},
    sending:{en:'Sending…', zh:'发送中…'},
    have:{en:'Already have one?', zh:'已有账户？'},
    signin:{en:'Sign in', zh:'登录'},
    exists:{en:'An account with that email already exists.', zh:'该邮箱已注册。'},
    short:{en:'Password must be at least 8 characters.', zh:'密码至少需要 8 个字符。'},
    badEmail:{en:'Please enter a valid email address.', zh:'请输入有效的邮箱地址。'}
  },
  verify:{
    title:{en:'Check your email', zh:'查收邮箱'},
    sub:{en:'We sent a 6-digit code to', zh:'我们已将六位验证码发送至'},
    code:{en:'Verification code', zh:'验证码'},
    btn:{en:'Verify and create account', zh:'验证并创建账户'},
    resend:{en:'Resend code', zh:'重新发送验证码'},
    sent:{en:'A new code has been sent.', zh:'新验证码已发送。'},
    wrong:{en:'That code is not right. Try again.', zh:'验证码不正确，请重试。'},
    expired:{en:'This code has expired. We just sent a fresh one.', zh:'验证码已过期，新码已重新发送。'},
    success:{en:'Email verified — welcome aboard!', zh:'邮箱验证成功——欢迎加入！'},
    demoBanner:{en:'Demo mode: no real email service is configured. Your code is shown below.', zh:'演示模式：未配置邮件服务，验证码显示如下。'}
  },
  cart:{
    title:{en:'Your Cart', zh:'购物车'},
    item:{en:'item', zh:'件'},
    items:{en:'items', zh:'件'},
    subtotal:{en:'Subtotal', zh:'小计'},
    shipping:{en:'Shipping', zh:'运费'},
    tax:{en:'Tax (estimated)', zh:'税费（预估）'},
    total:{en:'Total', zh:'合计'},
    checkout:{en:'Proceed to Checkout', zh:'前往结账'},
    continue:{en:'Continue Shopping', zh:'继续购物'},
    free:{en:'Free', zh:'免运费'}
  },
  checkout:{
    title:{en:'Checkout', zh:'结账'},
    note:{en:'Demo mode — no real payment will be processed.', zh:'演示模式——不会发生真实支付。'},
    ship:{en:'Shipping', zh:'配送信息'},
    pay:{en:'Payment', zh:'支付信息'},
    confirm:{en:'Confirm', zh:'确认'},
    address:{en:'Street address', zh:'详细地址'},
    city:{en:'City', zh:'城市'},
    zip:{en:'ZIP / Postal', zh:'邮编'},
    country:{en:'Country', zh:'国家/地区'},
    card:{en:'Card number (try 4242 4242 4242 4242)', zh:'卡号（演示卡 4242 4242 4242 4242）'},
    expiry:{en:'Expiry MM/YY', zh:'有效期 月/年'},
    cvc:{en:'CVC', zh:'安全码'},
    place:{en:'Place Order', zh:'提交订单'},
    placing:{en:'Placing order…', zh:'订单提交中…'}
  },
  order:{
    thank:{en:'Thank you for your order.', zh:'感谢您的订单。'},
    sub:{en:'A confirmation has been recorded in your account.', zh:'确认信息已记录在您的账户中。'},
    num:{en:'Order number', zh:'订单编号'},
    cont:{en:'Continue exploring', zh:'继续探索'}
  },
  account:{
    title:{en:'Account', zh:'我的账户'},
    profile:{en:'Profile', zh:'个人资料'},
    orders:{en:'Orders', zh:'订单'},
    threads:{en:'My threads', zh:'我的话题'},
    logout:{en:'Sign out', zh:'退出登录'},
    welcome:{en:'Welcome', zh:'欢迎'}
  },
  forum:{
    title:{en:'The Community', zh:'旅行社区'},
    sub:{en:'Trip reports, route advice, photo threads — from travelers who have actually been.', zh:'游记、路线建议、摄影专区——来自亲身游历的旅人。'},
    newThread:{en:'New thread', zh:'发起话题'},
    search:{en:'Search threads…', zh:'搜索话题…'},
    sortRecent:{en:'Most recent', zh:'最新'},
    sortPopular:{en:'Most liked', zh:'最热门'},
    sortReplies:{en:'Most replies', zh:'回复最多'},
    all:{en:'All', zh:'全部'},
    replies:{en:'replies', zh:'回复'},
    likes:{en:'likes', zh:'点赞'},
    by:{en:'by', zh:'作者'},
    backToForum:{en:'Back to forum', zh:'返回社区'},
    yourReply:{en:'Your reply…', zh:'您的回复…'},
    postReply:{en:'Post reply', zh:'发布回复'},
    signinToReply:{en:'Sign in to post a reply.', zh:'登录后即可回复。'},
    signinToPost:{en:'Sign in to start a thread.', zh:'登录后即可发起话题。'},
    threadTitle:{en:'Thread title', zh:'话题标题'},
    category:{en:'Category', zh:'分类'},
    threadBody:{en:'Share your trip report, question, or photo description…', zh:'分享您的游记、问题或摄影描述…'},
    publish:{en:'Publish thread', zh:'发布话题'},
    cancel:{en:'Cancel', zh:'取消'},
    confirmDelete:{en:'Delete this thread? This cannot be undone.', zh:'确认删除此话题？此操作不可撤销。'},
    deleted:{en:'Thread deleted.', zh:'话题已删除。'},
    just:{en:'just now', zh:'刚刚'},
    minAgo:{en:'min ago', zh:'分钟前'},
    hrAgo:{en:'hr ago', zh:'小时前'},
    dAgo:{en:'d ago', zh:'天前'}
  }
};
