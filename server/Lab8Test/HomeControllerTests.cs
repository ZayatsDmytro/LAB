using lab7.Controllers;
using lab7.mod;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using System.Data.SqlClient;

namespace lab8
{
    public class HomeControllerTests
    {
        private readonly HomeController _controller;
        private readonly Mock<SqlCommand> _mockCommand;
        private readonly Mock<SqlConnection> _mockConnection;

        public HomeControllerTests()
        {
            _mockCommand = new Mock<SqlCommand>();
            _mockConnection = new Mock<SqlConnection>();
            _controller = new HomeController();
        }

        [Fact]
        public async Task GetUser_ReturnsOkWithResults_WhenUserExists()
        {
            // Arrange
            var mockRegister = new register { email = "test@example.com", password = "password" };

            // Act
            var result = await _controller.getUser(mockRegister) as OkObjectResult;

            // Assert
            Xunit.Assert.NotNull(result);
            Xunit.Assert.IsType<OkObjectResult>(result);
            var users = result.Value as List<model>;
            Xunit.Assert.NotNull(users);
            Xunit.Assert.NotEmpty(users);
        }

        [Fact]
        public async Task GetUser_ReturnsOkWithEmptyList_WhenUserDoesNotExist()
        {
            // Arrange
            var mockRegister = new register { email = "notfound@example.com", password = "password" };

            // Act
            var result = await _controller.getUser(mockRegister) as OkObjectResult;

            // Assert
            Xunit.Assert.NotNull(result);
            Xunit.Assert.IsType<OkObjectResult>(result);
            var users = result.Value as List<model>;
            Xunit.Assert.NotNull(users);
            Xunit.Assert.Empty(users);
        }

        [Fact]
        public async Task CreateUser_ReturnsOk_WhenUserIsCreated()
        {
            // Arrange
            var mockRegister = new register { name = "John Doe", email = "john@example.com", password = "password" };

            // Act
            var result = await _controller.createUser(mockRegister);

            // Assert
            Xunit.Assert.IsType<OkResult>(result);
        }

    }
}