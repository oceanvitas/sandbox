(function(W, D) {
  $.ajaxSetup({cache: false});
  var config = {
        url: 'js/index.json',
        platform: 'www',
        page: 'index',
        limit: [],
        canLoad: true
      },
      //楼层内容控制显示
      limit = {
        www: {
          index: ['WebBanner', 'WebRecommendItems', 'WebAgeGroup', 'WebTwoLongGird', 'WebOnePullThree', 'WebNationalMuseum']
        },
        m: {
          index: ['m_Banner', 'm_TwoGrid', 'm_NewProduct', 'm_Promotions', 'm_ThreeLongGird', 'm_BrandOnePullTwo', 'm_BrandList', 'm_OnePullThree']
        }
      },
      $button = $('.create-spm');

  var snapshot = {};

  snapshot.init = function() {
    if(!config.canLoad) { return false}
      config.canLoad = true;
    $.get(config.url, function(res) {
      var data = JSON.parse(res);
      snapshot.json = data.data.operGroups;  //json存放原始数据
      snapshot.data = [];   //data存放处理后的数据
      snapshot.dealWithData();
      snapshot.renderPage();
    });
  };

  //处理数据
  snapshot.dealWithData = function() {
    if(!snapshot.json || snapshot.json.length == 0) { return }
    var i = 0,
        j = 0,
        k = 0,
        obj = {},
        block, content, list, item;
    //楼层循环
    for (; i < snapshot.json.length; i++) {
      block = snapshot.json[i];
      obj = {
        styleAlias: block.styleAlias,
        title: block.title ? block.title : block.name,
        floorIndex: i,
        floorID: block.id,
        content: [],
        contentLength: block.contents.length
      };
      if ($.inArray(obj.styleAlias, config.limit) === -1) {
        snapshot.json.splice(i, 1);
        continue
      }
      //楼层内容循环
      for (j = 0; j < obj.contentLength; j++) {
        content = block.contents[j];
        list = content.data.contents ? content.data.contents : content.data.items;
        obj.content[j] = {
          floorContentType: content.type,
          floorContentID: content.contentId,
          floorContentIndex: j,
          listLength: list.length,
          list: []
        };
        //楼层内容的内部循环
        for(k = 0; k < obj.content[j].listLength; k++) {
          item = list[k];
          obj.content[j].list[k] = {
            id: item.id,
            img: item.img
          }
        }
      }
      snapshot.data.push(obj);
    }
    console.log(snapshot.data)
  };

  snapshot.renderPage = function() {
    var data = snapshot.data,
        html = '<table>',
        len = snapshot.data.length,
        i = 0,
        j = 0,
        k = 0,
        block, content, list, item, 
        contentLength, listLength, tempHtml, spm;
    //楼层循环
    for(; i < len; i++){
      block = data[i];
      content = block.content;
      contentLength = content.length;
      tempHtml = '<tr><td>' + block.title + '</td><td><ul>';
      //内容循环
      for(j = 0; j < contentLength; j++){
        list = content[j];
        listLength = content.length;
        for(k = 0; k < listLength; k++){
          item = list[k];
          spm = 
          tempHtml = '<li>'+
                        '<img src="'+ item.img +'"/>'+
                        '<span></span>'+
                      '</li>';
        }
      }
      tempHtml += '</ul></td></tr>';
      html += tempHtml;
    }
    html += '</table>';

  };
  
  $button.on('click', function() {
    config.platform = $('input[name=platform]:checked').val();
    config.page = $('input[name=page]:checked').val();
    config.limit = limit[config.platform][config.page];
    snapshot.init();
  });
  
})(window, document);