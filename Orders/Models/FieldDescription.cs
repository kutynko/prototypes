using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Orders.Models
{
	public class FieldDescription
	{
		public int Id { get; set; }
		public string Caption { get; set; }
		public Type DataType { get; set; }
	}
}