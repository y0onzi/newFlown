const searchModel = require('../../models/searchModel');

// exports.renderSearchPage = (req, res) => {
//   const cities = ['서울', '경기도', '부산광역시'];
//   const districts = {
//     '서울': ['성북구', '마포구', '관악구'],
//     '경기도': ['성북구', '용인시', '성남시'],
//     '부산광역시': ['해운대구', '사하구', '연제구']
//   };
//   const neighborhoods = {
//     '성북구': ['돈암동', '길음동', '보문동'],
//     '마포구': ['합정동', '망원동', '상암동'],
//     '송파구': ['잠실2동', '잠실본동', '가락본동']
//   };



//   res.render('map/searchView', { cities, districts, neighborhoods });
// };

exports.renderSearchPage = (req, res) => {
  const cities = ['서울', '경기도', '부산광역시'];
  const districts = {
    '서울': ['성북구', '중구', '마포구', '관악구'],
    '경기도': ['중구', '용인시', '성남시'],
    '부산광역시': ['해운대구', '사하구', '연제구']
  };
  
  const neighborhoods = {
    '서울': {
      '성북구': ['돈암동', '길음동', '보문동'],
      '중구': ['동대문동', '신당동', '을지로동'],
      '마포구': ['합정동', '망원동', '상암동'],
      '관악구': ['신림동', '서림동', '낙성대동']
    },
    '경기도': {
      '중구': ['가짜동', '가짜2동', '가짜 4동'],
    
      '용인시': ['수지구', '처인구', '기흥구'],
      '성남시': ['분당구', '중원구', '수정구']
    },
    '부산광역시': {
      '해운대구': ['재송동', '우동', '좌동'],
      '사하구': ['괴정동', '다대동', '하단동'],
      '연제구': ['거제동', '연산동', '연산9동']
    }
  };

  res.render('map/searchView', { cities, districts, neighborhoods });
};





exports.getSearchResults = async (req, res) => {

  const city = req.query.city;
  const district = req.query.district;
  const neighborhood = req.query.neighborhood;

  //받아온 주소 ...
  console.log(city);
  console.log(district);
  console.log(neighborhood);

  try {
    const results = await searchModel.getSearchResults(city, district, neighborhood);
    console.log("컨트롤러: "+ results[0]);

  

    res.render('map/searchResultsView', { searchResults: results[0] });

   
  } catch (err) {
    console.error('검색 결과 조회 오류:', err);
    res.status(500).send('검색 결과를 가져오는 도중에 오류가 발생했습니다.');
  }
};