using Journey.Exception.ExceptionsBase;
using Journey.Infrastructure;

namespace Journey.Application.UseCases.Trips.Activities.Delete;

public class DeleteActivityForTripUseCase
{
    public void Execute(Guid tripId, Guid activityId)
    {
        var dbContext = new JourneyDbContext();
        var activity = dbContext
            .Activities
            .FirstOrDefault(activity => activity.Id == activityId && activity.TripId == tripId) ??
                throw new NotFoundException(ResourceErrorMessages.ACTIVITY_NOT_FOUND);
        dbContext.Activities.Remove(activity);
        dbContext.SaveChanges();
    }
}