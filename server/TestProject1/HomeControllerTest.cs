using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Threading.Tasks;
using lab7.Controllers;
using lab7.mod;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using Moq;
using Xunit;

public class HomeControllerTests
{
    private readonly HomeController _controller;
    private readonly Mock<SqlConnection> _mockConnection;
    private readonly Mock<SqlCommand> _mockCommand;

    public HomeControllerTests()
    {
        _mockConnection = new Mock<SqlConnection>();
        _mockCommand = new Mock<SqlCommand>();
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
        Assert.NotNull(result);
        Assert.IsType<OkObjectResult>(result);
        var users = result.Value as List<model>;
        Assert.NotNull(users);
        Assert.NotEmpty(users);
    }

    [Fact]
    public async Task GetUser_ReturnsOkWithEmptyList_WhenUserDoesNotExist()
    {
        // Arrange
        var mockRegister = new register { email = "notfound@example.com", password = "password" };

        // Act
        var result = await _controller.getUser(mockRegister) as OkObjectResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<OkObjectResult>(result);
        var users = result.Value as List<model>;
        Assert.NotNull(users);
        Assert.Empty(users);
    }

    [Fact]
    public async Task CreateUser_ReturnsOk_WhenUserIsCreated()
    {
        // Arrange
        var mockRegister = new register { name = "John Doe", email = "john@example.com", password = "password" };

        // Act
        var result = await _controller.createUser(mockRegister);

        // Assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task ReturnShit_ReturnsOkWithText()
    {
        // Act
        var result = await _controller.returnShit() as OkObjectResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<OkObjectResult>(result);
        Assert.Equal("text", result.Value);
    }
}
