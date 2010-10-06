class PointsController < ApplicationController
  def edit
  end

  def update
    @user = User.find(params[:id])
    @user.max_points = params[:points]
    respond_to do |format|
      if @user.save
        format.html { redirect_to(@user, :notice => 'User\'s points was successfully updated!') }
      else
        format.html { redirect_to(@user, :notice => 'Eror was occured!') }
      end
    end
  end

end

