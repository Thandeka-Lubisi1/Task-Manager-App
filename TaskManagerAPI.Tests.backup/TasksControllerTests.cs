using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Controllers;
using Xunit;

namespace TaskManagerAPI.Tests
{
    public class TasksControllerTests
    {
        [Fact]
        public void AddTask_WithValidTask_ReturnsOkResult()
        {
            // Arrange
            var controller = new TasksController();
            var task = new TaskItem
            {
                Title = "Test Task",
                Priority = "High"
            };

            // Act
            var result = controller.AddTask(task);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var returnedTask = okResult.Value as TaskItem;
            Assert.Equal("Test Task", returnedTask.Title);
            Assert.Equal("High", returnedTask.Priority);
            Assert.False(returnedTask.Completed);
            Assert.True(returnedTask.Id > 0);
        }

        [Fact]
        public void AddTask_WithEmptyTitle_ReturnsBadRequest()
        {
            // Arrange
            var controller = new TasksController();
            var task = new TaskItem
            {
                Title = "",
                Priority = "Medium"
            };

            // Act
            var result = controller.AddTask(task);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.Equal("Title is required", badRequestResult.Value);
        }

        [Fact]
        public void AddTask_WithInvalidPriority_ReturnsBadRequest()
        {
            // Arrange
            var controller = new TasksController();
            var task = new TaskItem
            {
                Title = "Test Task",
                Priority = "Invalid"
            };

            // Act
            var result = controller.AddTask(task);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.Equal("Priority must be High, Medium, or Low", badRequestResult.Value);
        }
    }
}
