
module.exports = ({app, validate, SERVICES, VALIDATORS}) => {

  const {
    exampleService,
    dbService,
    elasticSearchService
        } = SERVICES;

  app.get("/example", async (req, res) => {
      return res.status(200).json({message:"Hello World - Example3"})
  });

  app.post("/example", validate(VALIDATORS.example), async (req, res) => {
      try{
        let resp = await exampleService.get(req.body.name);
        let test = await dbService.query('example');
        let testES = await elasticSearchService.client().search({
          index: 'my-index',
          body: { foo: 'bar' }
        });

        if(resp){
          res.json({message:`Example saved`})
        }
        else{
          res.status(500).json({message:"Unable to save example"})
        }
      }
      catch(e){
        console.error(e)
        res.status(500).json({message:"Unable to save example"})
      }
  });

}
