namespace Microsoft.Maui.Controls.Compatibility.ControlGallery
{
	internal class OpenGLViewCoreGalleryPage : CoreGalleryPage<OpenGLView>
	{
		// TODO
		protected override bool SupportsFocus
		{
			get { return false; }
		}

		protected override void Build(StackLayout stackLayout)
		{
			base.Build(stackLayout);
		}
	}
}