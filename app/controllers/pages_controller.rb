class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token!, raise: false
  before_action :authenticate_devise_api_token!, only: [:restricted]
  def home; end

  def restricted
    if devise_api_token
      render json: { message: "You are logged in as #{devise_api_token.resource_owner.email}" }, status: :ok
    else
      render json: { message: 'You are not authorized' }, status: :unauthorized
    end
  end
end