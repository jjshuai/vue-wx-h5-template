// 全局自定义指令
import Vue from 'vue'
import directive from './directive'

Object.keys(directive).forEach(k => Vue.directive(k, directive[k]))
