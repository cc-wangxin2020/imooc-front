export const getImgElements = (itemElements) => {
  const imgElementList = []
  itemElements.forEach(element => {
    imgElementList.push(element.getElementsByTagName('img'))
  });
  return imgElementList
}

export const getAllImg = (imgElementList) => {
  const allImgs = []
  imgElementList.forEach(item => {
    allImgs.push(item.src)
  })
  return allImgs
}

export const onComplateImgs = (allImgs) => {
  const promiseList = []
  allImgs.forEach((img, index) => {
    promiseList[index] = new Promise((resolve, reject) => {
      const imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        resolve({
          img, index
        })
      }
      imgObj.onerror = (err) => {
        resolve({
          img, index, err
        })
      }
    })
  })
  return Promise.all(promiseList)
}

export const getMinHeightColumn = (columnHeightObj) => {
  const minHight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHight
  })
}

export const getMinHeight = (columnHeightObj) => {
  const heights = Object.values(columnHeightObj)
  return Math.min(...heights)
}

export const getMaxHeight = (columnHeightObj) => {
  const heights = Object.values(columnHeightObj)
  return Math.max(...heights)
}

