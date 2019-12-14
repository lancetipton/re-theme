const textStyle = {
  backgroundColor: '#fefefe',
  color: '#333333',
  borderBottom: '1px solid #e5ecea',
}

export const example = {
  grid: {
    title: {
      ...textStyle,
      width: '100%',
      marginBottom: 30,
    }
  },
  header: {
    default: {
      ...textStyle,
      cursor: 'pointer',
      transition: 'all .5s ease'
    },
    hover: {
      color: '#0b81fc'
    }
  },
  section: {},
  wrapper: {
    overflow: 'hidden',
    maxHeight: '0px',
    transition: 'all 1s ease',
    paddingLeft: 30,
    paddingRight: 30,
  }
}