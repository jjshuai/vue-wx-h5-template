// 按需全局引入 vant组件

import Vue from 'vue'
import {
  Button,
  Card, // 卡片
  Cell,
  CellGroup, // 单元格
  Checkbox,
  CheckboxGroup, // 复选框
  Collapse, // 折叠面板
  CollapseItem,
  CountDown, // 倒计时
  DatetimePicker, // 时间选择器
  Dialog, // 确认弹窗
  Divider, // 分割线
  Empty, // 空状态
  Field, // input输入栏
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton, // 商品导航
  Icon,
  Image as VanImage, // 图
  ImagePreview, // 图片预览
  IndexBar,
  IndexAnchor, // 索引栏
  Lazyload, // 懒加载
  Loading, // loading
  Overlay, // 蒙层
  Popup, // 弹窗
  Radio,
  RadioGroup, // 单选框
  Rate, // 评星
  Step,
  Steps, // 步骤条
  Sticky, // 粘性布局
  Swipe,
  SwipeItem, // 轮播
  SwipeCell, // 滑动单元格
  Tab,
  Tabs, // 标签页
  Tabbar,
  TabbarItem, // 标签栏
  Tag, // 标签
  Toast, // 轻提示
  // TreeSelect // 分类选择
  Uploader // 上传文件

} from 'vant'

// 按A~Z排列
Vue.use(Button).use(Card).use(Cell).use(CellGroup).use(Checkbox).use(CheckboxGroup).use(Collapse).use(CollapseItem)
  .use(CountDown).use(DatetimePicker).use(Dialog).use(Divider).use(Empty).use(Field).use(GoodsAction).use(GoodsActionButton)
  .use(GoodsActionIcon).use(Icon).use(VanImage).use(ImagePreview).use(IndexBar).use(IndexAnchor).use(Lazyload)
  .use(Loading).use(Overlay).use(Popup).use(Radio).use(RadioGroup).use(Rate).use(Step).use(Steps).use(Sticky).use(Swipe)
  .use(SwipeItem).use(SwipeCell).use(Tab).use(Tabs).use(Tabbar).use(TabbarItem).use(Tag).use(Toast).use(Uploader)
