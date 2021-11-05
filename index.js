$(function () {
  function nameFilter(resultData, data, name) {
    const re = new RegExp(name);
    let returnData = [];
    resultData.forEach((index) => {
      if (data[index].title.match(re)) {
        returnData.push(index);
      }
    });
    return returnData;
  }
  function likeFilter(resultData, data, like) {
    let returnData = [];
    resultData.forEach((index) => {
      if (data[index].score >= Number(like)) {
        returnData.push(index);
      }
    });
    return returnData;
  }

  function streamingFilter(resultData, data, streaming) {
    let returnData = [];
    resultData.forEach((index) => {
      if (data[index].streaming == Number(streaming)) {
        returnData.push(index);
      }
    });
    return returnData;
  }
  function genreFilter(resultData, data, genre) {
    let returnData = [];
    resultData.forEach((index) => {
      if (data[index].genre == genre) {
        returnData.push(index);
      }
    });
    return returnData;
  }

  const inputs = document.querySelectorAll('input');
  const selects = document.querySelectorAll('select');

  const items = document.getElementById('items');
  const resultNum = document.getElementById('resultNum');

  function reload(resultData, data) {
    items.innerHTML = '';

    resultNum.textContent = resultData.length;

    resultData.forEach((index) => {
      items.innerHTML += `
      <div class="item shadow">
      <a href="./detail.html#${data[index].id}"><img src="${data[index].image}" alt="${data[index].title}の画像"></a>
      <div class="item-texts">
      <h3>${data[index].title}</h3>
      <p>上映時間:<span>${data[index].screening_time}</span>分</p>
      <p>おすすめ度:<span>${data[index].score}</span>%</p>
      <p>ジャンル:<span>${data[index].genre}</span></p>
      </div>
    </div>
      `;
    });

    if (resultData.length === 0) {
      items.innerHTML =
        "<div class='f-cen'><h3 class='f3'>作品が見つかりませんでした</h3></div>";
    }
  }

  $.ajax({
    url: 'http://api.skilljapan.info/api/movie',
    dataType: 'json',
    type: 'get',
    cache: false,
  })
    .done(function (data) {
      // 初期設定
      let resultData = [];
      data.forEach((dt) => {
        resultData.push(dt.id - 1);
      });
      reload(resultData, data);

      inputs.forEach((el) => {
        el.addEventListener('input', () => {
          resultData = [];
          data.forEach((dt) => {
            resultData.push(dt.id - 1);
          });

          // filter
          if (inputs[0].value) {
            resultData = nameFilter(resultData, data, inputs[0].value);
          }
          if (inputs[1].value) {
            resultData = likeFilter(resultData, data, inputs[1].value);
          }
          if (!selects[0].value == '') {
            resultData = streamingFilter(resultData, data, selects[0].value);
          }
          if (!selects[1].value == '') {
            resultData = genreFilter(resultData, data, selects[1].value);
          }

          reload(resultData, data);
        });
      });

      // select
      selects.forEach((el) => {
        el.addEventListener('input', () => {
          resultData = [];
          data.forEach((dt) => {
            resultData.push(dt.id - 1);
          });

          // filter
          if (inputs[0].value) {
            resultData = nameFilter(resultData, data, inputs[0].value);
          }
          if (inputs[1].value) {
            resultData = likeFilter(resultData, data, inputs[1].value);
          }
          if (!selects[0].value == '') {
            resultData = streamingFilter(resultData, data, selects[0].value);
          }
          if (!selects[1].value == '') {
            resultData = genreFilter(resultData, data, selects[1].value);
          }

          reload(resultData, data);
        });
      });
    })
    .fail(function (e1, e2, e3) {
      console.log(e1);
      console.log(e2);
      console.log(e3);
    });
});
