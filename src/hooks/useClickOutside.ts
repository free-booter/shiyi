// 点击组件之外的地方触发事件
export default function useClickOutside(target: HTMLElement, callback: Function) {
  console.log('useClickOutside');
  
  const handler = (e: MouseEvent) => {
    if (target && !target.contains(e.target as HTMLElement)) {
      callback()
    }
  }
  document.addEventListener('click', handler)
  return () => {
    document.removeEventListener('click', handler)
  }
}