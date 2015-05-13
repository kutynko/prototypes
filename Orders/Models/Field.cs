using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Orders.Models
{
	public class Field
	{
		public int Id { get; set; }
		public FieldDescription Metadata { get; set; }
		public object Value { get; set; }
	}
}