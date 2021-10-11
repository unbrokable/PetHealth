namespace PetHealth.Infrastructure
{
    public static class Helper
    {
        public static T Updata<T,D>(this T old, D newEntity)
        {
            var newProp = newEntity.GetType().GetProperties();
            foreach (var prop in newProp)
            {
                var data = prop.GetValue(newEntity);

                if (old.GetType().GetProperty(prop.Name) != null)
                {
                    var oldProp = old.GetType().GetProperty(prop.Name);
                    oldProp.SetValue(old, data);
                }
            }
            return old;
        }
    }
}
