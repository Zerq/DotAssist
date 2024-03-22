using System.ComponentModel;
using System.Windows.Input;
using Microsoft.Maps.MapControl.WPF;

namespace Microsoft.Maui.Controls.Compatibility.Maps.WPF
{
	internal class FormsPushPin : Pushpin
	{
		public Pin Pin { get; private set; }

		internal FormsPushPin(Pin pin)
		{
			Pin = pin;

			UpdateLocation();

			Loaded += FormsPushPin_Loaded;
			Unloaded += FormsPushPin_Unloaded;
			MouseDown += FormsPushPin_MouseDown;
		}

		void FormsPushPin_Loaded(object sender, System.Windows.RoutedEventArgs e)
		{
			Pin.PropertyChanged += PinPropertyChanged;
		}

		void FormsPushPin_Unloaded(object sender, System.Windows.RoutedEventArgs e)
		{
			Pin.PropertyChanged -= PinPropertyChanged;
		}

		void FormsPushPin_MouseDown(object sender, MouseButtonEventArgs e)
		{
			Pin.SendMarkerClick();
		}

		void PinPropertyChanged(object sender, PropertyChangedEventArgs e)
		{
			if (e.PropertyName == Pin.PositionProperty.PropertyName)
				UpdateLocation();
		}

		void UpdateLocation()
		{
			Location = new Location(Pin.Position.Latitude, Pin.Position.Longitude);
		}
	}
}
