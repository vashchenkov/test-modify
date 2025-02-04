import mitt from "mitt";
import {inject} from 'vue'

export const emitter = mitt()

export default emitter

export const useEmitter = () => inject('$emitter')
