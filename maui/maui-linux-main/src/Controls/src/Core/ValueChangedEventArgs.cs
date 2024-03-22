using System;

namespace Microsoft.Maui.Controls
{
	public class ValueChangedEventArgs : EventArgs
	{
		public ValueChangedEventArgs(double oldValue, double newValue)
		{
			OldValue = oldValue;
			NewValue = newValue;
		}

		public double NewValue { get; private set; }

		public double OldValue { get; private set; }
	}
}