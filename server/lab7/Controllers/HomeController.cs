using lab7.mod;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace lab7.Controllers
{
    
    public class HomeController : Controller
    {
        private SqlCommand _command;
        private SqlConnection _connection = new SqlConnection("Data Source=DESKTOP-HV8EGKB\\SQLEXPRESS;Initial Catalog=Lab7;Integrated Security=True;Encrypt=True;TrustServerCertificate=True");

        [HttpPost]
        [Route("get")]
        public async Task <IActionResult> getUser([FromBody] register data)
        {
            var result = new List<model>();
            _connection.Open();
            _command = new SqlCommand("getUser", _connection);
            _command.CommandType = CommandType.StoredProcedure;
            _command.Parameters.AddWithValue("@email", data.email);
            _command.Parameters.AddWithValue("@password", data.password);
            using (SqlDataReader reader = await _command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    var model = new model();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        var prop = typeof(model).GetProperty(reader.GetName(i));

                        if (prop != null)
                        {
                            prop.SetValue(model, reader.GetValue(i));
                        }
                        
                    }
                    result.Add(model);
                }
               
            }
            _connection.Close();
            return Ok(result);

        }
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> createUser([FromBody]register data)
        {
            _connection.Open();
            _command = new SqlCommand("createUser", _connection);
            _command.CommandType = CommandType.StoredProcedure;
            _command.Parameters.AddWithValue("@name", data.name);
            _command.Parameters.AddWithValue("@email", data.email);
            _command.Parameters.AddWithValue("@password", data.password);
            await _command.ExecuteNonQueryAsync();
            _connection.Close();
            return Ok();

        }
        [HttpGet]
        [Route("return")]
        public async Task<IActionResult> returnShit()
        {
            var result = "text";
            return Ok(result);

        }

    }
}
