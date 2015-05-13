using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Orders.Models
{
	public class OrdersContext : DbContext
	{

		public OrdersContext()
			: base("name=OrdersContext")
		{
		}

		public DbSet<Order> Orders { get; set; }
		public DbSet<Operation> Operations { get; set; }

	}
}
