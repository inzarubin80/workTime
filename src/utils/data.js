
export const groupArrayByKey = (arrayObjects,  getKeyGroup, keyValue) => {

    let keyGroup = '';
    let newDataObj = {};
    arrayObjects.map((item) => {    
        
        keyGroup = getKeyGroup(item);

        console.log(keyGroup);
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