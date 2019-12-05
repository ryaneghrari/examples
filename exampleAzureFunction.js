const ExampleService = require('../services/example')
const BarService     = require('../services/bar')
const UtilService    = require('../services/utils')

module.exports = async function (context, req) {

  const Authcode = req.query.Authcode;

  if(Authcode !== process.env["Authcode"]){
    context.res = {
      status: 401,
      body: "Unauthorized"
    };
  }
  else{
    //Fetch data
    const example = await ExampleService.getExamples();
    const bar = await BarService.getBar();

    //Join on bar id
    example = example.reduce((acc, e) => {
      let match = bar.filter(b => b.ID === e.ID)[0];
      if(match){
        e["match"] = match.field;
      }
      acc.push(e);
      return acc;
    },[])

    //Add field to each item
    example.map(e => {
      e.field = `${e.date.slice(0,7)}-01`;
      return e;
    })

    const csv = UtilService.JsonToCsv(example);

    context.res = {
      status: 200,
      body: csv
    };

  }
};
