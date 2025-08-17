using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static readonly List<TaskItem> tasks = [];
        private static int nextId = 1;
        private static readonly string[] ValidPriorities = ["High", "Medium", "Low"];

        [HttpGet]
        public IEnumerable<TaskItem> GetTasks()
        {
            return tasks;
        }

        [HttpPost]
        public IActionResult AddTask(TaskItem task)
        {
            if (string.IsNullOrWhiteSpace(task.Title))
            {
                return BadRequest("Title is required");
            }

            if (string.IsNullOrWhiteSpace(task.Priority) || 
                !ValidPriorities.Contains(task.Priority))
            {
                return BadRequest("Priority must be High, Medium, or Low");
            }
            
            task.Id = nextId++;
            task.Completed = false;
            tasks.Add(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public IActionResult CompleteTask(int id)
        {
            var task = tasks.Find(t => t.Id == id);
            
            if (task == null)
            {
                return NotFound($"Task with ID {id} not found");
            }
          
            task.Completed = true;
            return Ok(task);
        }
    }

    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Priority { get; set; } = "Medium";
        public bool Completed { get; set; }
    }
}
