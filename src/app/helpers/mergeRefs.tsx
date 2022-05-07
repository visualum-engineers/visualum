export default function mergeRefs(refs: any) {
    return (value: any) => {
      refs.forEach((ref: any) => {
        if (typeof ref === 'function') {
          ref(value)
        } else if (ref != null) {
          ref.current = value
        }
      })
    }
  }