
export const groupArrayByKey = (arrayObjects,  getKeyGroup, keyValue) => {

    let newDataObj = {};
    arrayObjects.map((item) => {    
        let keyGroup = getKeyGroup(item);
        if ([keyGroup] in newDataObj) {
          newDataObj[keyGroup] = newDataObj[keyGroup] + Number(item[keyValue]);
        }
        else {
          newDataObj[keyGroup] = Number(item[keyValue]);
        }
      })

      let newData = [];
      for (let keyGroup in newDataObj) {
        newData.push({key: keyGroup, value: newDataObj[keyGroup] });
      }

      return newData;

}