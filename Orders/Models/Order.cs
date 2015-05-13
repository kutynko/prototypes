using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Orders.Models
{
	public class Order
	{
		public int Id { get; set; }

		private readonly List<Operation> _operations = new List<Operation>();
		public List<Operation> Operations { get { return _operations; } }

		private readonly List<Reason> _reasons = new List<Reason>();
		public List<Reason> Reasons { get { return _reasons; } }
	}
}