using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Orders.Models;

namespace Orders.Controllers
{
    public class OperationsController : ApiController
    {
		private OrdersContext db = new OrdersContext();

		// GET: api/Operations
		public IQueryable<Operation> GetOperations()
		{
			return db.Operations;
		}

		// GET: api/Operations/5
		[ResponseType(typeof(Operation))]
		public async Task<IHttpActionResult> GetOperation(int id)
		{
			Operation operation = await db.Operations.FindAsync(id);
			if (operation == null)
			{
				return NotFound();
			}

			return Ok(operation);
		}

		// PUT: api/Operations/5
		[ResponseType(typeof(void))]
		public async Task<IHttpActionResult> PutOperation(int id, Operation operation)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (id != operation.Id)
			{
				return BadRequest();
			}

			db.Entry(operation).State = EntityState.Modified;

			try
			{
				await db.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!OperationExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return StatusCode(HttpStatusCode.NoContent);
		}

		// POST: api/Operations
		[ResponseType(typeof(Operation))]
		public async Task<IHttpActionResult> PostOperation(Operation operation)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			db.Operations.Add(operation);
			await db.SaveChangesAsync();

			return CreatedAtRoute("DefaultApi", new { id = operation.Id }, operation);
		}

		// DELETE: api/Operats/5
		[ResponseType(typeof(Operation))]
		public async Task<IHttpActionResult> DeleteOperat(int id)
		{
			Operation oparetion = await db.Operations.FindAsync(id);
			if (oparetion == null)
			{
				return NotFound();
			}

			db.Operations.Remove(oparetion);
			await db.SaveChangesAsync();

			return Ok(oparetion);
		}

		protected override void Dispose(bool disposing)
		{
			if (disposing)
			{
				db.Dispose();
			}
			base.Dispose(disposing);
		}

		private bool OperationExists(int id)
		{
			return db.Operations.Count(e => e.Id == id) > 0;
		}
    }
}
