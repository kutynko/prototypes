using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Orders.Models
{
	public class Reason
	{
		public int Id { get; set; }
		public string Description { get; set; }

		private readonly List<Field> _fields = new List<Field>();
		public List<Field> Fields { get { return _fields; } }
	}
}